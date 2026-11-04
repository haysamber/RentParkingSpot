import BookForm from "./BookForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  return <BookForm id={id} />;
}
