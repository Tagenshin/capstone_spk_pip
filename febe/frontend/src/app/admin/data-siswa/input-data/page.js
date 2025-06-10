import { Suspense } from "react";
import StudentInputPage from './StudentInputPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StudentInputPage />
    </Suspense>
  );
}
