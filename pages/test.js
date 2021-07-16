import { useState } from 'react'; 

export default function TalentSearch() {
  const [value, setValue] = useState(0)

  function clicked() {
      setValue(value+1);
  }
  return (
    <div>
      <button onClick={clicked}>click me</button>
      <input type="text" name="search" />
      <div>
        <p>{value}</p>
      </div>
    </div>
  );
}