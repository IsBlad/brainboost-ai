from setuptools import setup, find_packages

setup(
    name="brainboost-ai",
    version="0.1",
    packages=find_packages(),
    install_requires=[
        'openai',
        'toml',
        'qrcode',
        'Pillow',
    ],
)