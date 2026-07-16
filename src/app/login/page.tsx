import Link from "next/link"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <section className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold">Perfume Store</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign-in is being finalized. You can continue to the admin dashboard.
        </p>
        <Link
          href="/admin/dashboard"
          className="mt-6 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Open dashboard
        </Link>
      </section>
    </main>
  )
}
