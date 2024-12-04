import {useParams} from "react-router-dom";

function Edit() {
  const params = useParams();

  return (
    <div>
      {params.id}번 수정페이지
    </div>
  );
}

export default Edit;