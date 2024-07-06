
export interface RootStoryBlok {
    story: Story
    cv: number
    rels: any[]
    links: any[]
  }
  
  export interface Story {
    name: string
    created_at: string
    published_at: string
    id: number
    uuid: string
    content: Content
    slug: string
    full_slug: string
    sort_by_date: any
    position: number
    tag_list: any[]
    is_startpage: boolean
    parent_id: any
    meta_data: any
    group_id: string
    first_published_at: string
    release_id: any
    lang: string
    path: any
    alternates: any[]
    default_full_slug: any
    translated_slugs: any
  }
  
  export interface Content {
    _uid: string
    component: string
    navbar_section: NavbarSection[]
  }
  
  export interface NavbarSection {
    _uid: string
    title: string
    component: string
    signIn_button_text: string
  }
  