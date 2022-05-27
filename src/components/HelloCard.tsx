import styles from './hello.card.module.scss';
import imgSrc from '@assets/imgs/vite.png';
function HelloCard() {
  return (
    <div className={styles['wrap']}>
      <div className={styles['icons-wrap']}>
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
}

export default HelloCard;
