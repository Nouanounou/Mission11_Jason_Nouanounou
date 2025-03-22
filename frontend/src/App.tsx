import './App.css';
import Header from './Header';
import Footer from './Footer';
import BookLists from './BookLists';
import AmazonJourney from './AmazonJourney';

function App() {
  return (
    <>
      <Header />
      <AmazonJourney />
      <br />
      <BookLists />
      <Footer />
    </>
  );
}

export default App;
