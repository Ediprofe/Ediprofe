import { getAllSubjectsWithUnits } from '@/lib/content-utils';
import NavigationClient from './NavigationClient';

export default async function Navigation() {
  const subjects = await getAllSubjectsWithUnits();
  
  // Mapear a la estructura que necesita el cliente
  const subjectsData = subjects.map(subject => ({
    slug: subject.slug,
    name: subject.name,
    icon: subject.icon,
    description: subject.description,
  }));

  return <NavigationClient subjects={subjectsData} />;
}
