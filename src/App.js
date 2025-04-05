import AddJob from './components/AddJob';
import JobList from './components/JobList';
import './App.css'; // optional, if you're using external CSS

function App() {
  return (
    <div>
      <h1 className="app-title">Student Job Tracker</h1>
      <AddJob />
      <hr />
      <JobList />
    </div>
  );
}

export default App;
