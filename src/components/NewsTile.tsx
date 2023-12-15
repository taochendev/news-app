import {
  Card,
  CardHeader,
  CardBody,
  Center,
  Box,
  Heading,
  Text,
  Button
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import MaxLine from "./MaxLine";
import { Article } from "../types";

interface NewsTileProps extends React.ComponentProps<typeof Card> {
  data: Article;
  onMoreClick: (data: Article) => void;
}

const NewsTile: React.FC<NewsTileProps> = ({ data, onMoreClick, ...props }) => (
  <Card boxShadow="md" border="1px" borderColor="gray.100" {...props}>
    <CardHeader>
      <Heading size="sm" maxLine="2" as={MaxLine} title={data.title}>
        {data.title}
      </Heading>
    </CardHeader>
    <Box
      bgImage={`url('${data.urlToImage}')`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      height="3xs"
    >
      {!data.urlToImage && <Center height="full">(No Preview)</Center>}
    </Box>
    <CardBody>
      <Text as={MaxLine} maxLine="2">
        {data.description}
      </Text>
    </CardBody>
    <Button size="sm" margin="1" onClick={() => onMoreClick(data)}>
      More
      <ArrowForwardIcon ml="1" />
    </Button>
  </Card>
);

export default NewsTile;
