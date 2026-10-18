import { useAuth } from "../context/AuthContext.jsx";
import { Button, PageHero } from "../components/UI.jsx";
import Reveal from "../components/Reveal.jsx";

// Example protected page - extend with orders, inquiries, etc. once your backend exists.
export default function Account() {
  const { user, logout } = useAuth();
  return (
    <>
      <PageHero title="My Account" />
      <section className="py-12">
        <Reveal className="mx-auto max-w-xl rounded-xl p-6 shadow-lg ring-1 ring-slate-100">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-slate-500">Name</dt><dd className="font-semibold text-navy-800">{user?.name}</dd></div>
            <div className="flex justify-between"><dt className="text-slate-500">Email</dt><dd className="font-semibold text-navy-800">{user?.email}</dd></div>
          </dl>
          <Button variant="outline" className="mt-6" onClick={logout}>Log out</Button>
        </Reveal>
      </section>
    </>
  );
}
