import { Card, CardHeader, Text, SimpleGrid, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { RiEmotionLaughFill } from "react-icons/ri";
import { FaHeart, FaMicrochip, FaMicroscope } from "react-icons/fa";
import {
  MdSportsVolleyball,
  MdBusinessCenter,
  MdHealthAndSafety
} from "react-icons/md";

const categories: [string, IconType][] = [
  ["business", MdBusinessCenter],
  ["entertainment", RiEmotionLaughFill],
  ["general", FaHeart],
  ["health", MdHealthAndSafety],
  ["science", FaMicroscope],
  ["sports", MdSportsVolleyball],
  ["technology", FaMicrochip]
];

const Categories: React.FC = () => (
  <>
    <Text fontSize="xl" mt="1" mb="5">
      Choose category here
    </Text>
    <SimpleGrid columns={[1, 2, 3, 4]} spacing="4">
      {categories.map(([category, Content]) => (
        <Card
          key={category}
          as={Link}
          to={category}
          bgColor="gray.100"
          _hover={{ bgColor: "gray.50" }}
        >
          <Icon as={Content} boxSize="40" color="gray.300" />
          <CardHeader>
            <Text textTransform="capitalize" fontSize="xl" textAlign="right">
              {category}
            </Text>
          </CardHeader>
        </Card>
      ))}
    </SimpleGrid>
  </>
);

export default Categories;
