import GenericPage from '../../components/GenericPage';
import { SOCIAL_LINKS } from '../../constants/socialLinks';

const SocialMedia = () => {
  return (
    <GenericPage title="Social Media Team">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ssgmce-orange">
            Official Channels
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">
            Connect with SSGMCE online
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            Use these official SSGMCE channels for institute updates, event coverage, alumni engagement, and media announcements.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {SOCIAL_LINKS.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white ${item.buttonClass}`}>
                  <Icon className="text-xl" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-gray-900">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.url.replace(/^https?:\/\//, '')}
                </p>
                <span className={`mt-5 inline-flex items-center text-sm font-semibold ${item.textClass}`}>
                  Open channel
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </GenericPage>
  );
};

export default SocialMedia;
