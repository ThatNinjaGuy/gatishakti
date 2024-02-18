import { FC } from "react";
import { Services } from "@/models/services";
import FeaturedService from "./FeaturedService";

type Props = {
  featuredServices: Services[];
};

const FeaturedServices: FC<Props> = (props) => {
  const { featuredServices } = props;
  return (
    <section>
      {featuredServices.map((element) => (
        <FeaturedService key={element.slug.current} featuredService={element} />
      ))}
    </section>
  );
};

export default FeaturedServices;
