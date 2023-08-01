import { Suspense } from "react";
import { lazy } from "react";
import LoadingSidos from "../../lib/src/components/LoadingSidos";

const UsulanForm = lazy(() => import("./UsulanForm"));

const UsulanAdd = () => {
  return (
    <Suspense fallback={<LoadingSidos />}>
      <UsulanForm
        submitEndpoint="addUsulan"
        titlePage="Tambah Usulan"
        type="add"
      />
    </Suspense>
  );
};
export default UsulanAdd;
