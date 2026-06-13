import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactGA from 'react-ga4'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import DirectorMessage from './pages/DirectorMessage'
import PrincipalMessage from './pages/PrincipalMessage'
import OurMangment from './pages/OurMangment'
import Faculty from './pages/Faculty'
import AdmissionProcedure from './pages/AdmissionProcedure'
import Facilities from './pages/Facilities'
import Gallery from './pages/Gallery'
import Contactus from './pages/Contactus'
import AdmissionPage from './pages/AdmissionPage'
import TeacherApplicationForm from './pages/TeacherApplicationForm'
import CareersPage from './pages/CareersPage'
import BlogList from './pages/BlogList'
import BlogDetails from './pages/BlogDetails'
import BookList from './pages/BookList'
import FeesStructure from './pages/FeesStructure'
import Uniform from './pages/Uniform'
import ExamTimetable from './pages/ExamTimetable'
import NewsEvents from './pages/NewsEvents'
import Videos from './pages/Videos'

ReactGA.initialize('G-5TCL497RW6')

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/DirectorMessage" element={<DirectorMessage />} />
        <Route path="/PrincipalMessage" element={<PrincipalMessage />} />
        <Route path="/OurMangment" element={<OurMangment />} />
        <Route path="/Faculty" element={<Faculty />} />
        <Route path="/AdmissionProcedure" element={<AdmissionProcedure />} />
        <Route path="/Facilities" element={<Facilities />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Contactus" element={<Contactus />} />
        <Route path="/AdmissionForm" element={<AdmissionPage />} />
        <Route path="/AdmissionPage" element={<AdmissionPage />} />
        <Route path="/CareersPage" element={<CareersPage />} />
        <Route
          path="/careers/apply"
          element={<TeacherApplicationForm />}
        />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/BookList" element={<BookList />} />
        <Route path="/FeesStructure" element={<FeesStructure />} />
        <Route path="/Uniform" element={<Uniform />} />
        <Route path="/ExamTimetable" element={<ExamTimetable />} />
        <Route path="/NewsEvents" element={<NewsEvents />} />
        <Route path="/Videos" element={<Videos />} />
      </Routes>
    </BrowserRouter>
  )
}
