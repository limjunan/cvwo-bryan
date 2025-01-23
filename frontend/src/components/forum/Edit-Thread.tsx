import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../services/api";
import Tag from "./Tag";
import { FaPen } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { FormError } from "../FormError";
import { FormSuccess } from "../FormSuccess";

interface EditThreadProps {
  ID: number;
  title: string;
  content: string;
  tags: TagProps[];
  onPost: () => void;
}

interface TagProps {
  ID: number;
  Name: string;
  Color: string;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(10, {
    message: "Content must be at least 10 characters.",
  }),
  tags: z.array(z.number()), // Array of tag IDs
});

const EditThread: React.FC<EditThreadProps> = ({
  ID,
  title,
  content,
  tags,
  onPost,
}) => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      content: content,
      tags: tags.map((tag) => tag.ID),
    },
  });
  const { control, handleSubmit, reset, formState } = methods;
  const [allTags, setAllTags] = useState<TagProps[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags");
        setAllTags(response.data);
      } catch (error) {
        console.error("There was an error fetching the tags!", error);
      }
    };

    fetchTags();
  }, []);

  const onSubmit = async (data: {
    title: string;
    content: string;
    tags: number[];
  }) => {
    try {
      const response = await api.put(`/threads/${ID}`, {
        title: data.title,
        content: data.content,
        tags: data.tags,
      });
      console.log("Updated thread:", response.data);
      onPost();
      setSuccess("Thread edited successfully!");
    } catch (error) {
      setError("There was an error editing the thread!");
      console.error("There was an error updating the thread!", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2">
          <FaPen size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Thread</DialogTitle>
          <DialogDescription>
            Make changes to your thread here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="Edit title" {...field} />
                    </FormControl>
                    {formState.errors.title && (
                      <FormMessage className="text-red-500 text-xs italic">
                        {formState.errors.title?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <FormControl>
                      <Textarea
                        id="content"
                        placeholder="Edit content"
                        {...field}
                      />
                    </FormControl>
                    {formState.errors.content && (
                      <FormMessage className="text-red-500 text-xs italic">
                        {formState.errors.content?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Tags</FormLabel>
                      <FormDescription>
                        Select the tags for the thread.
                      </FormDescription>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {allTags.map((item) => (
                        <FormItem
                          key={item.ID}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.ID)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.ID])
                                  : field.onChange(
                                      field.value.filter(
                                        (value: number) => value !== item.ID
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel>
                            <Tag name={item.Name} color={item.Color} />
                          </FormLabel>
                        </FormItem>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
          <div className="mt-4">
            <FormError message={error} />
            <FormSuccess message={success} />
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditThread;
