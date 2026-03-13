import { MainLayout } from './components/layout/MainLayout'
import { TodoRegion } from './components/todo/TodoRegion'
import { CalendarRegion } from './components/calendar/CalendarRegion'
import { DetailedRegion } from './components/category/DetailedRegion'

export default function App() {
  return (
    <MainLayout
      todoRegion={<TodoRegion />}
      calendarRegion={<CalendarRegion />}
      detailedRegion={<DetailedRegion />}
    />
  )
}
