import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '@/modules/Header/Header';
import Footer from '@/modules/Footer/Footer';
import CalendarPage from '@/pages/Calendar/CalendarPage';
import EventsPage from '@/pages/Events/EventsPage';

function App() {
    return (
        <>
            <Header />
            <main>
                <Routes>
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="*" element={<Navigate to={'/calendar'} />} />
                </Routes>
            </main>
            <Footer />
        </>
    )
}

export default App;
