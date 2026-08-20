import { useTranslation } from 'react-i18next'
import SectionContainer from '../components/SectionContainer'
import { useLocalizedText } from '../hooks/useLocalizedText'
import { menuCategories, menuItems } from '../data/menu'

function Menu() {
  const { t } = useTranslation()
  const localize = useLocalizedText()

  return (
    <SectionContainer id="menu" className="bg-neutral-50">
      <h2 className="text-3xl font-semibold text-neutral-900">{t('sections.menu.title')}</h2>

      <div className="mt-10 space-y-12">
        {menuCategories.map((category) => (
          <div key={category.id}>
            <h3 className="text-xl font-semibold text-neutral-800">{localize(category.label)}</h3>

            <ul className="mt-4 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {menuItems
                .filter((item) => item.category === category.id)
                .map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
                    <div>
                      <p className="font-medium text-neutral-900">{localize(item.name)}</p>
                      <p className="mt-1 text-sm text-neutral-600">{localize(item.description)}</p>
                    </div>
                    <span className="whitespace-nowrap font-semibold text-neutral-900">
                      {item.price.toFixed(2)} €
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}

export default Menu
