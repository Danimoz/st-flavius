import PageHero from '@/components/PageHero';
import { requireAdminSession } from '@/libs/admin-auth';
import Parishioner from '@/libs/models';
import connectToDb from '@/libs/mongodb';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isObjectIdOrHexString } from 'mongoose';
import EditParishionerForm from './EditParishionerForm';

export const metadata: Metadata = {
  title: 'Edit parishioner | St. Flavius',
  robots: { index: false, follow: false },
};

export default async function EditParishionerPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminSession();
  const { id } = await params;
  if (!isObjectIdOrHexString(id)) notFound();

  await connectToDb();
  const parishioner = await Parishioner.findById(id);
  if (!parishioner) notFound();

  const details = {
    parishionerId: parishioner.parishionerId,
    firstName: parishioner.firstName,
    lastName: parishioner.lastName,
    dateOfBirth: parishioner.dateOfBirth,
    occupation: parishioner.occupation ?? '',
    address: parishioner.address,
    email: parishioner.email ?? '',
    phone: parishioner.phone ?? '',
    baptized: Boolean(parishioner.baptized),
    communicant: Boolean(parishioner.communicant),
    confirmed: Boolean(parishioner.confirmed),
    married: Boolean(parishioner.married),
  };

  return (
    <main className="bg-[#f1eeea] text-[#211d19]">
      <PageHero eyebrow="Parish administration" title="Edit parishioner details." description="Keep the parish register up to date with the correct membership information." compact />
      <section className="px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <EditParishionerForm id={id} details={details} />
      </section>
    </main>
  );
}
