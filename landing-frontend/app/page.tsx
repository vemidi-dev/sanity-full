import { client } from "../lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import Image from "next/image";
import HeroParallaxImage from "./HeroParallaxImage";
import ScrollReveal from "./ScrollReveal";
import StickyCtaBar from "./StickyCtaBar";

type SanityImage = {
  asset?: {
    _ref?: string;
    _type?: "reference";
  };
};

type LandingPageData = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImage;
  price?: number;
  ctaText?: string;
  productImages?: SanityImage[];
  gallery?: Array<{
    asset?: {
      url?: string;
    };
  }>;
};

const builder = createImageUrlBuilder(client);
const urlFor = (source: SanityImage) => builder.image(source);

export default async function Home() {
  const data = await client.fetch<LandingPageData>(`*[_type == "landingPage"][0]{
    pageTitle,
    heroTitle,
    heroSubtitle,
    heroImage,
    price,
    ctaText,
    productImages,
    gallery[]{
      asset->{
        url
      }
    }
  }`
  );
  const ctaText = data?.ctaText || "Поръчай сега";
  const heroImageUrl = data?.heroImage
    ? urlFor(data.heroImage).width(1200).url()
    : null;
  const productImages = data?.productImages ?? [];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FFF9F4] text-[#2D2D2D]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 left-0 h-64 w-64 rounded-full bg-[#FDE68A]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#BFDBFE]/30 blur-3xl"
      />
      {/* HERO */}
      <section className="relative min-h-[80vh] w-full overflow-hidden">
        {heroImageUrl ? (
          <HeroParallaxImage
            src={heroImageUrl}
            alt={data?.heroTitle || "Сезони игра"}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#ECFCD5] via-[#FEF9C3] to-[#FFF1E6]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6]/95 via-[#F5EFE6]/78 to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[72%] bg-white/20 backdrop-blur-[3px] [mask-image:linear-gradient(to_right,black_72%,transparent)]"
        />

        <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl items-center px-6">
          <div className="hero-card-appear max-w-xl rounded-3xl border border-white/40 bg-white/60 p-8 shadow-2xl backdrop-blur-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(0,0,0,0.16)] md:p-12">
            <span className="inline-flex rounded-full bg-[#F4D35E] px-4 py-1 text-sm text-[#5C5346] shadow-sm">
              🎁 Подарък за 1 юни
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.2] tracking-[0.01em] text-gray-800 md:text-6xl">
              {data?.heroTitle || "Магнитна игра Сезони"}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-gray-600">{data?.heroSubtitle}</p>
            <p className="mt-6 flex items-end gap-3 text-gray-800">
              <span className="text-3xl font-semibold">
                {data?.price ? `${(data.price / 1.95583).toFixed(2)} €` : "—"}
              </span>
              <span className="pb-1 text-sm font-medium text-gray-500">
                {data?.price ? `${data.price} лв` : ""}
              </span>
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="rounded-full bg-[#A3D977] px-6 py-3 text-black shadow-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl">
                {ctaText} 🎁
              </button>
              <button className="rounded-full border border-gray-200 bg-white px-6 py-3 text-gray-700 shadow-sm transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
                Виж повече
              </button>
            </div>
          </div>
        </div>
      </section>

      {data?.gallery && data.gallery.length > 0 && (
        <section className="relative mx-auto max-w-6xl overflow-hidden px-6 py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-6 top-8 h-28 w-28 rounded-full bg-[#C4B5FD]/30 blur-2xl"
          />
          <div className="grid grid-cols-2 gap-6 rounded-3xl bg-gradient-to-br from-[#F7F8FF] to-[#FFFDF8] p-8 shadow-sm md:grid-cols-3 md:gap-8 md:p-10">
            {data.gallery.map((img, i) =>
              img?.asset?.url ? (
                <ScrollReveal key={`${img.asset.url}-${i}`} delayMs={i * 90}>
                  <Image
                    src={img.asset.url}
                    alt={`Gallery image ${i + 1}`}
                    width={500}
                    height={500}
                    className="h-auto w-full rounded-3xl bg-[#FFFDF8] p-3 object-cover shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:shadow-md"
                  />
                </ScrollReveal>
              ) : null
            )}
          </div>
        </section>
      )}

      {/* PRODUCT */}
      <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#EEF6FF] to-[#F9FCFF] px-8 py-20 text-center shadow-sm md:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-8 top-8 h-24 w-24 rounded-full bg-[#BAE6FD]/35 blur-2xl"
        />
        <h2 className="mb-14 text-center text-4xl font-semibold tracking-[0.02em]">Какво получавате</h2>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "🌳 Голямо магнитно табло",
              description: "Детето подрежда сезоните и учи чрез визуална игра",
            },
            {
              title: "🧠 Образователни карти",
              description: "Развиват логика, въображение и реч",
            },
            {
              title: "🎯 Магнити за игра",
              description: "Свързване на обекти със сезоните по забавен начин",
            },
          ].map((item, idx) => {
            const image = productImages[idx];
            const imageUrl = image?.asset?._ref
              ? urlFor(image).width(500).height(340).fit("crop").url()
              : heroImageUrl;

            return (
              <ScrollReveal key={item.title} delayMs={idx * 110}>
                <article className="rounded-2xl bg-white p-4 shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={500}
                      height={340}
                      className="mb-4 h-56 w-full rounded-xl object-cover"
                    />
                  ) : (
                    <div className="mb-4 h-56 w-full rounded-xl bg-[#F3F4F6]" />
                  )}
                  <h3 className="mb-2 text-left text-xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-left text-base leading-relaxed text-gray-600">{item.description}</p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative mx-auto my-8 max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFF8EF] to-[#FFFDF7] px-6 py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-4 h-20 w-20 rounded-full bg-[#FDE68A]/35 blur-xl"
        />
        <div className="grid gap-6 md:grid-cols-4">
          {[
            "Без екрани",
            "Развива мислене",
            "Игра с родител",
            "Образователно забавление",
          ].map((item, idx) => (
            <ScrollReveal key={item} delayMs={idx * 90}>
              <article className="rounded-3xl bg-[#FFF7E8] p-8 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md">
                <p className="leading-relaxed">{item}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* HOW TO PLAY */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#F7F2FF] to-[#FFF9FD] px-6 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-6 h-24 w-24 rounded-full bg-[#DDD6FE]/35 blur-2xl"
        />
        <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-[#FFFFFF]/75 to-[#FFF5FF]/70 p-8 shadow-sm md:p-10">
          <h2 className="mb-12 text-center text-3xl font-medium tracking-[0.02em]">Как се играе</h2>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-4">
            {[
              {
                step: "01",
                icon: "🌸",
                title: "Избери сезон",
                description: "Детето започва с любимия сезон",
              },
              {
                step: "02",
                icon: "🧩",
                title: "Подреди магнитите",
                description: "Поставя правилните елементи",
              },
              {
                step: "03",
                icon: "🔍",
                title: "Открий разликите",
                description: "Сравнява и мисли логически",
              },
              {
                step: "04",
                icon: "🗣️",
                title: "Разкажи история",
                description: "Развива въображение и реч",
              },
            ].map((stepItem, idx) => (
              <ScrollReveal key={stepItem.step} delayMs={idx * 110}>
                <article className="relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-md transition-all duration-300 ease-out hover:-translate-y-[4px] hover:shadow-xl">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 top-0 text-7xl font-bold leading-none text-gray-900/10"
                  >
                    {stepItem.step}
                  </span>
                  <div className="relative z-10">
                    <p className="mb-3 text-3xl">{stepItem.icon}</p>
                    <h3 className="mb-2 text-lg font-bold text-gray-800">{stepItem.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{stepItem.description}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPMENT */}
      <section className="relative mx-auto my-8 max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#EFFFF4] to-[#F7FFF9] px-8 py-20 text-center shadow-sm md:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 bottom-2 h-28 w-28 rounded-full bg-[#86EFAC]/25 blur-2xl"
        />
        <h2 className="mb-12 text-3xl font-medium tracking-[0.02em]">Какво развива</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            "Логика",
            "Фина моторика",
            "Реч",
            "Концентрация",
            "Познания за света",
          ].map((item, idx) => (
            <ScrollReveal key={item} delayMs={idx * 90}>
              <article className="rounded-3xl bg-[#F4FFF1] p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-md">
                <p className="leading-relaxed">{item}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[#F5EFE6] py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold tracking-[0.02em] text-gray-800">
            Какво казват родителите
          </h2>
          <p className="mt-3 text-center text-lg text-gray-600">
            Истински отзиви от доволни клиенти
          </p>

          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
            {[
              {
                text: "Детето ми не спира да играе! Най-накрая нещо без екран.",
                author: "Мария, майка на 4г. дете",
              },
              {
                text: "Учите сезоните без натиск. Страхотна идея!",
                author: "Иван, баща",
              },
              {
                text: "Перфектна за детска градина. Децата са във възторг.",
                author: "Елена, учител",
              },
            ].map((review, idx) => (
              <ScrollReveal
                key={review.author}
                delayMs={idx * 120}
                className="min-w-[85%] snap-start sm:min-w-[70%] md:min-w-0"
              >
                <article className="rounded-2xl bg-white p-6 shadow-md transition-all duration-300 ease-out hover:shadow-xl">
                  <p className="text-lg tracking-wide text-[#EAB308]">★★★★★</p>
                  <p className="mt-4 italic leading-relaxed text-gray-700">"{review.text}"</p>
                  <p className="mt-4 font-semibold text-gray-900">{review.author}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto mb-8 max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFEFB8] to-[#FFF5D6] px-8 py-20 text-center shadow-sm md:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 bottom-4 h-20 w-20 rounded-full bg-[#FDE68A]/35 blur-xl"
        />
        <h2 className="mb-6 text-3xl font-semibold tracking-[0.02em]">Перфектен подарък за 1 юни 🎁</h2>
        <p className="mb-8 text-lg font-semibold leading-relaxed text-[#4B4B4B]">Ограничени количества. Поръчай сега.</p>
        <button className="rounded-full bg-gradient-to-r from-[#A3E635] to-[#FACC15] px-8 py-4 text-lg font-medium tracking-wide text-[#2D2D2D] shadow transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
          Вземи сега
        </button>
      </section>

      {/* FOOTER */}
      <footer className="relative mt-8 overflow-hidden bg-gradient-to-br from-[#F2F9FF] via-[#FFF9EF] to-[#F4FFF1] px-6 py-14 text-[#3F3F3F]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-6 h-20 w-20 rounded-full bg-[#BAE6FD]/35 blur-xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-[42%] bg-[#FDE68A]/30 blur-xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-1/3 h-16 w-16 rounded-full bg-[#86EFAC]/30 blur-lg"
        />

        <div className="relative mx-auto grid max-w-6xl gap-8 rounded-3xl bg-white/65 p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md md:grid-cols-4 md:p-10">
          <div className="md:col-span-2">
            <p className="mb-3 inline-flex rounded-full bg-[#FEF08A]/70 px-4 py-1 text-sm font-medium text-[#5C5346]">
              🌈 Създадено с любов за деца
            </p>
            <h3 className="mb-3 text-2xl font-medium tracking-[0.02em]">Сезони Игра</h3>
            <p className="max-w-md leading-relaxed text-[#4B4B4B]">
              Образователни игри с илюстративен, приятелски дизайн, които превръщат ученето в приключение.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-semibold tracking-[0.02em]">Бързи линкове</h4>
            <ul className="space-y-2 text-[#4B4B4B]">
              <li>🧩 Как работи</li>
              <li>📦 Какво включва</li>
              <li>⭐ Отзиви</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-semibold tracking-[0.02em]">Контакт</h4>
            <ul className="space-y-2 text-[#4B4B4B]">
              <li>📧 hello@sezoni.bg</li>
              <li>📞 +359 888 123 456</li>
              <li>📍 София, България</li>
            </ul>
          </div>
        </div>

        <p className="relative mx-auto mt-6 max-w-6xl text-center text-sm text-[#5F5F5F]">
          © {new Date().getFullYear()} Сезони Игра • 🎨 playful learning for little explorers
        </p>
      </footer>

      <StickyCtaBar
        productName="Магнитна игра Сезони"
        priceLabel={data?.price ? `${data.price} лв` : "30 лв"}
        buttonText="Купи сега 🎁"
      />
    </main>
  );
}