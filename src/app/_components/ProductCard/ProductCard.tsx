import Image from 'next/image';
import styles from './ProductCard.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface ProductCardProps {
  product: Product;
  isAuthenticated: boolean;
  isFirst?: boolean;
}

const ProductCard = ({ product, isAuthenticated, isFirst = false }: ProductCardProps) => {
  return (
    <div className={styles.card}>
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={120}
        height={120}
        priority={isFirst}
      />
      <div className={styles.cardTitle}>{product.title}</div>
      <div className={styles.cardCategory}>{product.category.toUpperCase()}</div>
      <div className={styles.cardPrice}>${product.price}</div>
      {isAuthenticated && (
        <button className={styles.button} type="button">
          Add to cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
