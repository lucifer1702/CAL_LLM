import PyPDF2
from tkinter import *
from tkinter import filedialog


def open_pdf():

    root = Tk()
    root.geometry("750x450")
    text = Text(root, width=80, height=30)
    text.pack(pady=20)

    menu = Menu(root)
    root.config(menu=menu)
    file_menu = Menu(menu, tearoff=False)
    menu.add_cascade(label="File", menu=file_menu)
    file_menu.add_command(label="Open", command=open_pdf)
    file_menu.add_command(label="Quit", command=root.quit)

    root.mainloop()
    file = filedialog.askopenfilename(
        title="Select a PDF", filetypes=(("PDF Files", "*.pdf"), ("All Files", "*.*"))
    )
    if file:
        pdf_file = PyPDF2.PdfReader(file)
        content = ""
        for page in range(len(pdf_file.pages)):
            content += pdf_file.pages[page].extract_text()
        text.delete(1.0, END)
        text.insert(1.0, content)
    return text


text = open_pdf()
print(text)
