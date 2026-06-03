import {
  Contact,
  Dock,
  Finder,
  Navbar,
  Photos,
  Safari,
  Terminal,
  Welcome,
} from "#components";

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Finder />
      <Safari />
      <Photos />
      <Contact />
      <Terminal />
      <Dock />
    </main>
  )
}

export default App
