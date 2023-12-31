import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "@/components/MediaCard";

type Topic = {
  id: number;
  title: string;
  body: string;
};

/**
 * `Basic` Home 페이지.
 *
 * 서버에서 가져온 주제(topic) 데이터를 기반으로, 각 주제에 대한 요약 정보와 상세 페이지로의 링크를 제공합니다.
 */
export default async function Home() {
  const resp = await fetch(`${process.env.API_URL}/topics`, {
    cache: "no-cache",
  });
  const topics = await resp.json();
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box>
        <Alert severity="info" sx={{ mt: 2, mb: 5 }}>
          <AlertTitle>Next 13 - Basic</AlertTitle>
          Next 13 최소한의 사용 샘플
        </Alert>

        <Grid container rowSpacing={"1rem"} columnSpacing={"1rem"}>
          {topics.length > 0 ? (
            topics.map((topic: Topic) => {
              return (
                <Grid key={topic.id} md={6} lg={4}>
                  <MediaCard
                    heading={topic.title}
                    text={topic.body}
                    href={`/basic/read/${topic.id}`}
                  />
                </Grid>
              );
            })
          ) : (
            <></>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
