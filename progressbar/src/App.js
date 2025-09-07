import ProgressBar from './components/ProgressBar';
import { useEffect, useState } from 'react';
import { MIN_VALUE } from './utils/constants';
function App() {
  const [value, setValue] = useState(MIN_VALUE);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((prevVal) => prevVal + 1)
    }, 1000);
  }, []);
  
  const handleComplete = () => {
    setSuccess(true);
  }
  return (
    <div className="App">
      <span>Progress Bar</span>
      <ProgressBar value={value} handleComplete={handleComplete} />
      {success ? 'Loaded successfully' : 'Loading' }
    </div>
  );
}

export default App;
