import ServiceMenu from './service-menu';
import QuickActions from './quick-actions';
import SearchBar from '../search/search-bar';
import FeaturedServices from './featured-services';
import RemoteDiagnosis from './remote-diagnosis';
import HealthNews from './health-news';
import { Banner } from './banner';
import { Card } from './card';
import { BookButton } from './book-button';
import { CalComing } from './calcoming';

function HomePage() {
  return (
    <div className="pb-4">
      <Banner/>
      <Card/>
      <div className="mt-4">
        <BookButton/>
      </div>
      <div className="mt-4">
        <CalComing/>
      </div>
      {/* <SearchBar className="mx-4" /> */}
      {/* <QuickActions /> */}
      {/* <ServiceMenu /> */}
      {/* <FeaturedServices /> */}
      {/* <RemoteDiagnosis /> */}
      {/* <HealthNews /> */}
    </div>
  );
}

export default HomePage;
