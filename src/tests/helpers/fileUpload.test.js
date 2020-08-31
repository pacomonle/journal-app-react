const cloudinary = require('cloudinary');
const { fileUpload } = require("../../helpers/fileUpload")
 //const cloudUrl = 'https://api.cloudinary.com/v1_1/nolitoxd/image/upload';
 cloudinary.config({ 
    cloud_name: 'nolitoxd', 
    api_key: '178749185767399', 
    api_secret: 'FA6XP2IiPrXyrWcqiS4Vo_IHnGY' 
});

describe('Pruebas en fileUpload', () => {
    

    test('debe de cargar un archivo y retornar el URL', async(done) => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
          // obtener la imagen de la response
        const blob = await resp.blob();
       
        const file = new File([blob], 'foto.png');
        // console.log('file', file)
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');
       
            // Borrar imagen por ID
            const segments = url.split('/');
            const imageId = segments[ segments.length - 1 ].replace('.png','');
    
            cloudinary.v2.api.delete_resources( imageId, {}, ()=> {
                //uso del callback done que entra por parametro
                done();
            });
    })

    test('debe de retornar un error', async() => {
       
        const file = new File([], 'foto.png');
        // console.log(file)
       
        /*
        const url = await fileUpload( file );
        console.log(url)
        expect( url ).toBe( null );
        */
        
    })
 
    
    


})


