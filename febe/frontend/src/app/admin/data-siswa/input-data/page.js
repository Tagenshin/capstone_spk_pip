import { Suspense } from "react";
import StudentInputPage from './StudentInputPage';
import Loading from "../../../components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <StudentInputPage />
    </Suspense>
  );
}
