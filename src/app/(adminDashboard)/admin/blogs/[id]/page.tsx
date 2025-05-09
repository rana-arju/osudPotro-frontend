import { EditBlogForm } from "@/components/edit-blog-form";


export default async function EditBlogPage({ params }: any) {
  const {id} = await params;
  return (
    <div className="flex flex-col gap-6 pt-2 md:pt-0">
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">Edit Blog Post</h1>
        <p className="text-muted-foreground">Update your blog post</p>
      </div>

      <EditBlogForm id={id} />
    </div>
  );
}