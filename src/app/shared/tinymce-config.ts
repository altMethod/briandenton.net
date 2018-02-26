export const tinymceConfig = {
    options: {
        selector: 'textarea',
        height: 300,
        width: 810,
        menubar: false,
        statusbar: false,
        toolbar_items_size: 'small',
        resize: true,
        plugins: [
            'codesample advlist autolink lists link image charmap preview anchor textcolor',
            'searchreplace visualblocks code',
            'insertdatetime media contextmenu paste code help'
        ],
        // tslint:disable-next-line:max-line-length
        toolbar: ['codesample insert | undo redo | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help']
    }
};
