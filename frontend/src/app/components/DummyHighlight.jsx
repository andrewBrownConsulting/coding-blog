import { parseDate } from "../utils";
export default function DummyHighlight() {
  return (
    <div className='col-12 col-md-6 highlight rounded pt-3'>
      <div className="img-fluid rounded" style={{ height: "300px", width: "500px", backgroundColor: "darkgray" }}></div>
      <h1 >Most Recent Post</h1>
      <p>Date</p>
    </div>
  );
} 
