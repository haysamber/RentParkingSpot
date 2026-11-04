import BookForm from "./BookForm";



interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  return <BookForm id={id} />;
}
