const button = document.querySelector('[data-add-button]')
const list = document.querySelector('[data-list]')
const categoriesList = document.querySelector('[data-categories]')
const buttonAddCategory = document.querySelector('[data-add-category]')
const categoryTitle = document.querySelector('[data-category-title]')

const categories = [
        {
            category: "Tarefas de casa",
            items: [{
                item: " ",
                checked: true,
                id: 1
            }
        ],
        id: 1
    },
]


const createItemList = (id, text='') => {
    const item = document.createElement('li')
    item.setAttribute('data-item', id)
    item.classList.add('item')
    item.innerHTML = `
        <input class="checkbox" type="checkbox" id="item-${id}">
    `

    const label = document.createElement('label')
    label.setAttribute('for', `item-${id}`)
    label.classList.add('card')
    label.innerHTML = `
            <div class="checkField">
                <img class="image" src="./icons/checkIcon.png" />
            </div>
        `

    const inputField = document.createElement('input')
    inputField.classList.add('checkbox__text')
    inputField.value = text

    inputField.addEventListener('keyup', (e) => { 
        const currentCategoryElement = document.querySelector('.navBar__category--active');
        const currentCategoryId = Number(currentCategoryElement.dataset.id);
        const currentCategory = categories.find((category) => category.id === currentCategoryId);
        
        const itemIndex = currentCategory.items.findIndex((item) => item.id === id);
        currentCategory.items[itemIndex].item = e.target.value;
    });

    label.appendChild(inputField)

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteButton')
    deleteButton.innerHTML = '<img src="./icons/delete.svg">'
    deleteButton.addEventListener('click', () => {
        const itemToBeRemoved = document.querySelector(`[data-item="${id}"]`)
        itemToBeRemoved.remove()
    })

    label.appendChild(deleteButton)
    item.appendChild(label)
    return item
    }

    // O delete ta dentro do label, o label ta dentro do item e ele retorna o item.
    // (confirmar)

button.addEventListener('click', () => {
    const currentCategoryElement = document.querySelector('.navBar__category--active');
    const currentCategory = categories.find((category) => category.id === Number(currentCategoryElement.dataset.id))
    console.log(currentCategoryElement.dataset)
    const newId = list.childElementCount + 1
    const element = createItemList (newId)
    list.prepend(element)

const inputField = element.querySelector('.checkbox__text');

currentCategory.items.push({
    id: newId,
    item: "",
    checked: false,
  })
  
  console.log(categories)
inputField.focus();
})

const loadCategoryItems = () => {
    list.innerHTML=''
    const currentCategoryElement = document.querySelector('.navBar__category--active');
    const currentCategory = categories.find((category) => category.id === Number(currentCategoryElement.dataset.id))
    currentCategory.items.forEach((item) => {
        console.log('loadid', item.id)
        const element = createItemList(item.id, item.item)
        list.prepend(element)
    })
}

const handleActiveCategory = (categoryElement, currentCategory) => {
        categoriesList.childNodes.forEach((categoryNode) => {
            if(categoryNode.classList) {
            categoryNode.querySelector('.navBar__category').classList.remove('navBar__category--active')
            categoryTitle.innerHTML = currentCategory.category
            }
        })
        categoryElement.querySelector('.navBar__category').classList.add('navBar__category--active')
        loadCategoryItems()
    }

const createCategoryElement = (element) => {
    const categoryElement = document.createElement('li')
    const currentCategory = categories.find((category) => category.id === element.id)

    const categoryInput = document.createElement('input')
    categoryInput.classList.add('navInput')
    categoryInput.addEventListener('keyup', (e) => {
        currentCategory.category = e.target.value
    })
    categoryElement.appendChild(categoryInput)
    categoryElement.addEventListener('click', () => handleActiveCategory(categoryElement, currentCategory))
    
    const categoryButton = document.createElement ('button')
    categoryButton.setAttribute('data-id', currentCategory.id)
    categoryButton.innerHTML = `
        <span class="navBar__category__counter">1/4</span>
    `

    categoriesList.childNodes.forEach((categoryNode) => {
        if(categoryNode.classList) {
            categoryNode.querySelector('.navBar__category').classList.remove('navBar__category--active')
            categoryTitle.innerHTML = currentCategory.category
        }
    })

    categoryButton.classList.add('navBar__category')
    categoryButton.classList.add('navBar__category--active')
    categoryButton.prepend(categoryInput)
    categoryElement.appendChild(categoryButton)

    return categoryElement
}

const handleAddCategory = () => {
    const newId = categoriesList.childElementCount + 1;
    const newCategory = {
        id: newId,
        category: '',
        items: []
    }
    categories.push(newCategory)
    const categoryElement = createCategoryElement(newCategory)
    categoriesList.appendChild(categoryElement)
    categoriesList.lastElementChild.querySelector('.navInput').focus();
    // Essa linha faz ter o foco do cursor piscando ^
    console.log(newCategory)
}

buttonAddCategory.addEventListener('click', handleAddCategory)