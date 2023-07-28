if [ -z "$1" ]; then
    echo "Donne un nom pour l'image docker :)"
    echo "Exemple :"
    echo "  $0 atalata/eclipse-webapp"
    exit 1
fi

./build.sh

docker build . -t atalata/eclipse-website