import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SampleComponent = () => {
  const samples = useSelector((state: RootState) => state.sample);

  return (
    <div>
      <h2>Sample List</h2>
      <ul>
        {samples.map((sample) => (
          <li key={sample.id}>{sample.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SampleComponent;
