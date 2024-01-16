import React, { useState, useEffect } from 'react';

const DropdownMenu = ({ data, onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState(data[0]?.province || null);
  const [selectedCity, setSelectedCity] = useState(data[0]?.city || null);

  // 선택된 지역이 변경될 때마다 콜백 함수 호출
  useEffect(() => {
    onSelect({ selectedProvince, selectedCity });
  }, [onSelect, selectedProvince, selectedCity]);

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedCity(null);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="dropdown">
      <div className="menu">
        <select
          style={{ fontSize: '20px' }}
          value={selectedProvince || ''}
          onChange={(e) => handleProvinceChange(e.target.value)}
        >
          {data.map((item) => (
            <option key={item.province} value={item.province}>
              {item.province}
            </option>
          ))}
        </select>
        {selectedProvince && (
          <select
            style={{ fontSize: '20px' }}
            value={selectedCity || ''}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            {data
              .filter((item) => item.province === selectedProvince)
              .map((item) => (
                <option key={item.city} value={item.city}>
                  {item.city}
                </option>
              ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
