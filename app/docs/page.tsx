import Docs from "@/components/docs";
import { title } from "@/components/primitives";

export default async function DocsPage() {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <Docs />
    </div>
  );
}
