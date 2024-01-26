import React, { useState, useEffect, useCallback } from 'react';

const DropdownMenu = ({ data, onSelect }) => {
  const [selectedProvince, setSelectedProvince] = useState(data[0]?.province || null);
  const [selectedCity, setSelectedCity] = useState(data[0]?.city || null);

  // useCallback을 사용하여 최적화
  const memoizedOnSelect = useCallback(() => {
    onSelect({ selectedProvince, selectedCity });
  }, [onSelect, selectedProvince, selectedCity]);

   // 선택된 지역이 변경될 때마다 콜백 함수 호출
   useEffect(() => {
    onSelect({ selectedProvince, selectedCity });
  }, [selectedProvince, selectedCity]);

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedCity(''); // 선택된 도시 초기화
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="dropdown">
      <div className="dropdownMenu">
        <select
          className='dropdownSelect'
          value={selectedProvince}
          onChange={(e) => handleProvinceChange(e.target.value)}
        >
          {data.map((item) => (
            <option key={`${item.province}-${item.city}`} value={item.province}>
              {item.province}
            </option>
          ))}
        </select>
        {selectedProvince && (
          <select
            className='dropdownSelect'
            value={selectedCity}
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

export default React.memo(DropdownMenu);  // React.memo로 감싸기
