import { siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:px-6">
        <p>
          © {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.
        </p>
        <p>Website design · Maintenance · Repair · Software</p>
      </div>
    </footer>
  )
}
