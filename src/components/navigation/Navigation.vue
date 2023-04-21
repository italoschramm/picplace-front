<template>
    <div id="navigation">
      <TabMenu :model="items" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
        return {
            active: 3,
            items: [
                {
                    label: 'Anúncios',
                    to: "/"
                },
                {
                    label: 'Anuncie',
                    to: "/advertise"
                },
                {
                    label: 'Publicado',
                    to: "/myAdvertises"
                },
                {
                    label: 'Perfil',
                    to: "/profile"
                },
                {
                    label: 'Sobre',
                    to: "/about"
                }
            ]
        }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  #navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;
    ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0 0 0 0;
      li {
        font-size: 1.2rem;
        padding: 2px 10px;
        cursor: pointer;
        &:hover {
          color: #7ca971;
        }
      }
    }
  }
  </style>