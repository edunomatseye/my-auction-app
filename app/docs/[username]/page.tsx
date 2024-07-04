import Docs from "@/components/docs";
import { title } from "@/components/primitives";

export default function DocsPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <Docs username={params.username} />
    </div>
  );
}
