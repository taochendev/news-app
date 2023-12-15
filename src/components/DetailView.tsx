import { Box, Text, Image, Divider, Button, Link } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { Article } from "../types";
import { formatDate } from "helpers";

interface DetailViewProps {
  data: Article;
  onBackClick: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ data, onBackClick }) => (
  <Box>
    <Text fontSize="2xl">{data.title}</Text>
    <Divider my="5" />
    <Box boxSize="full">
      <Image src={data.urlToImage} alt="preview" />
    </Box>

    <Text fontSize="sm" color="gray.500" textAlign="right" fontStyle="italic">
      <Link href={data.url} target="_blank">
        Posted on {data.source.name}
      </Link>
      &nbsp;
      {!!data.author && `by ${data.author}`}
      &nbsp;on&nbsp;
      {formatDate(data.publishedAt)}
    </Text>
    <Text my="5">{data.content}</Text>
    <Box textAlign="right">
      <Button size="sm" mt="5" onClick={onBackClick}>
        <ArrowBackIcon mr="1" />
        Back to list
      </Button>
      <Button
        size="sm"
        mt="5"
        to={data.url}
        target="_blank"
        marginLeft="3"
        as={RouterLink}
      >
        <ArrowForwardIcon mr="1" />
        Go to the source link
      </Button>
    </Box>
  </Box>
);

export default DetailView;
