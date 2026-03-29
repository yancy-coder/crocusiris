"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, Navigation, MapPin, Loader2 } from "lucide-react";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  aqi: number;
  aqiLevel: string;
}

const weatherIcons: Record<string, React.ReactNode> = {
  "晴": <Sun className="w-10 h-10 text-amber-400" />,
  "多云": <Cloud className="w-10 h-10 text-gray-300" />,
  "阴": <Cloud className="w-10 h-10 text-gray-400" />,
  "雨": <CloudRain className="w-10 h-10 text-blue-400" />,
  "雪": <CloudSnow className="w-10 h-10 text-white" />,
};

const getAqiLevel = (aqi: number): { level: string; color: string } => {
  if (aqi <= 50) return { level: "优", color: "text-green-400" };
  if (aqi <= 100) return { level: "良", color: "text-yellow-400" };
  if (aqi <= 150) return { level: "轻度污染", color: "text-orange-400" };
  if (aqi <= 200) return { level: "中度污染", color: "text-red-400" };
  if (aqi <= 300) return { level: "重度污染", color: "text-purple-400" };
  return { level: "严重污染", color: "text-red-600" };
};

const getWindDirection = (degree: number): string => {
  const directions = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,visibility&timezone=auto`
        );
        const weatherData = await weatherRes.json();

        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=zh`
        );
        const geoData = await geoRes.json();
        const locationName = geoData.city || geoData.locality || "未知位置";

        const aqiRes = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi&timezone=auto`
        );
        const aqiData = await aqiRes.json();
        const aqi = aqiData.current?.us_aqi || 0;

        const code = weatherData.current.weather_code;
        let condition = "晴";
        if (code >= 1 && code <= 3) condition = "多云";
        else if (code >= 45 && code <= 48) condition = "阴";
        else if (code >= 51 && code <= 67) condition = "雨";
        else if (code >= 71 && code <= 77) condition = "雪";
        else if (code >= 80 && code <= 82) condition = "雨";
        else if (code >= 85 && code <= 86) condition = "雪";
        else if (code >= 95) condition = "雨";

        const aqiInfo = getAqiLevel(aqi);

        setWeather({
          location: locationName,
          temperature: Math.round(weatherData.current.temperature_2m),
          condition,
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          windDirection: getWindDirection(weatherData.current.wind_direction_10m),
          visibility: Math.round((weatherData.current.visibility || 10000) / 1000),
          aqi,
          aqiLevel: aqiInfo.level,
        });
        setLoading(false);
      } catch {
        setError("获取天气失败");
        setLoading(false);
      }
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeather(39.9042, 116.4074);
        }
      );
    } else {
      fetchWeather(39.9042, 116.4074);
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 w-full">
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 w-full">
        <div className="text-center text-white/60 py-8">{error || "无法获取天气"}</div>
      </div>
    );
  }

  const aqiInfo = getAqiLevel(weather.aqi);

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 w-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-4 h-4 text-amber-400" />
        <span className="text-white/80 text-sm">{weather.location}</span>
      </div>

      {/* Main Weather */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {weatherIcons[weather.condition] || weatherIcons["晴"]}
          <div>
            <div className="text-3xl font-bold text-white">{weather.temperature}°</div>
            <div className="text-sm text-white/60">{weather.condition}</div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Droplets className="w-4 h-4 text-blue-400" />
          <div>
            <div className="text-xs text-white/50">湿度</div>
            <div className="text-sm text-white">{weather.humidity}%</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Wind className="w-4 h-4 text-cyan-400" />
          <div>
            <div className="text-xs text-white/50">风力</div>
            <div className="text-sm text-white">
              {weather.windDirection} {weather.windSpeed}级
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Eye className="w-4 h-4 text-purple-400" />
          <div>
            <div className="text-xs text-white/50">能见度</div>
            <div className="text-sm text-white">{weather.visibility}km</div>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
          <Navigation className="w-4 h-4 text-green-400" />
          <div>
            <div className="text-xs text-white/50">AQI</div>
            <div className={`text-sm ${aqiInfo.color}`}>
              {weather.aqi} {weather.aqiLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
