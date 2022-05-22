from distutils.core import setup

setup(name='Fejka',
      version='1.0',
      description='Python service',
      author='Juan Barroso',
      author_email='juanchojbarroso@gmail.com',
      url='https://github.com/juanchojbarroso/fejka',
      packages=['fastapi', 'uvicorn[standard]', 'pandas'],
      )
