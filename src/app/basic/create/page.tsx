"use client";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TransitionContext from "@/context/TransitionContext";
import { FormEvent, useContext } from "react";
import { PATH } from "@/config/menuConfig";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const { chooseUrl } = useContext(TransitionContext);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const titleElement = e.currentTarget.elements.namedItem(
              "title"
            ) as HTMLInputElement;
            const bodyElement = e.currentTarget.elements.namedItem(
              "body"
            ) as HTMLTextAreaElement;
            if (!titleElement || !bodyElement) return;
            const title = titleElement.value;
            const body = bodyElement.value;
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ title, body }),
            };
            fetch(`${process.env.API_URL}/topics`, options)
              .then((res) => res.json())
              .then((result) => {
                const lastid = result.id;
                chooseUrl(`${PATH.basic.read.href}/${lastid}`);
                router.refresh();
              });
          }}
        >
          <p>
            <input type="text" name="title" placeholder="title" />
          </p>
          <p>
            <textarea name="body" placeholder="body"></textarea>
          </p>
          <p>
            <input type="submit" value="create" />
          </p>
        </form>
      </Box>
    </Container>
  );
};
export default Create;
