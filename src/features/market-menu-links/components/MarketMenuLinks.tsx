import React, { useState } from "react";
import styles from "./MarketMenuLinks.module.scss";
import type { MountOptions } from "../../../utils/render";
import {
  MENU_PRODUCTS,
  type MarketProduct,
  marketplaceUrl,
  productIconUrl,
  productLinks,
} from "../market-links";

export const marketMenuLinksMountOptions: MountOptions = {
  position: "append",
  className: styles.MarketMenu,
};

interface MarketMenuLinksProps {
  culture: string;
  countryId: number;
}

export const MarketMenuLinks: React.FC<MarketMenuLinksProps> = (props) => {
  return MENU_PRODUCTS.map((product) => (
    <ProductGroup
      key={product.industryId}
      product={product}
      culture={props.culture}
      countryId={props.countryId}
    />
  ));
};

interface ProductGroupProps extends MarketMenuLinksProps {
  product: MarketProduct;
}

/** The product's icon, which lists links to all of its qualities while hovered. */
const ProductGroup: React.FC<ProductGroupProps> = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div
      className={styles.Group}
      onMouseEnter={() => setIsOpened(true)}
      onMouseLeave={() => setIsOpened(false)}
    >
      <ProductIcon product={props.product} />
      {isOpened &&
        productLinks(props.product.industryId).map((link) => (
          <a
            key={`${link.industryId}/${link.quality}`}
            className={styles.Link}
            href={marketplaceUrl(props.culture, props.countryId, link)}
          >
            <ProductIcon product={link} />
          </a>
        ))}
    </div>
  );
};

const ProductIcon: React.FC<{ product: MarketProduct }> = ({ product }) => (
  <img
    className={styles.Icon}
    src={productIconUrl(product)}
    alt={`Industry ${product.industryId} Q${product.quality}`}
  />
);
