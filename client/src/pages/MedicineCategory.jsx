import { useParams } from "react-router-dom"

const MedicineCategory = () => {
  const { id } = useParams();
  console.log({id});
  return (
    <div>MedicineCategory</div>
  )
}

export default MedicineCategory