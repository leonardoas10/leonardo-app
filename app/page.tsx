import styles from './page.module.css';
import ImageSlideshow from '@/components/images/ImageSlideshow';

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <ImageSlideshow />
            </main>
        </div>
    );
}
